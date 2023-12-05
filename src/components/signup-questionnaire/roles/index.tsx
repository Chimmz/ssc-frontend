import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './index.module.scss';
import cls from 'classnames';
import RadioOptions from '../../ui/radio/RadioOptions';
import { RoleTypes, classifiedRoles, roleTypes } from './utils';
import RoleTypeOption from './RoleTypeOption';
import { Form } from 'react-bootstrap';
import useList from '../../../hooks/useList';
import CheckboxTag from '../../ui/checkboxes/CheckboxTag';
import CheckboxOptions from '../../ui/checkboxes/CheckboxOptions';
import api from '../../../library/api';
import useRequest from '../../../hooks/useRequest';
import useSignedInUser from '../../../hooks/useSignedInUser';
import { usePostSignupQuestionnaireContext } from '../../../contexts/PostSignupQuestionnaireContext';
import { TagsInput } from 'react-tag-input-component';
import { StepComponentProps } from '@/components/shared/multistep-component/withStepNavigation';
import fonts from '@/app/fonts';

type RoleType =
  | RoleTypes.ENTREPRENEURIAL
  | RoleTypes.MENTOR_OR_PROVIDER
  | RoleTypes.ECOSYSTEM_ENABLERS
  | '';

const ChooseRoles: FC<StepComponentProps> = function (props) {
  const { role, token } = useSignedInUser();
  const { updateUser } = usePostSignupQuestionnaireContext();

  const [selectedRoleType, setSelectedRoleType] = useState<RoleType>(
    (role?.kind as RoleType) || ''
  );
  const {
    items: selectedRoles,
    addItem: addRole,
    removeItem: removeRole
  } = useList(role?.roles);

  useEffect(() => {
    if (role?.kind === selectedRoleType && role?.roles.every(r => selectedRoles.includes(r)))
      return;
    return () => {
      const body = { role: { kind: selectedRoleType, roles: selectedRoles } };
      updateUser?.(body);
    };
  }, [role, selectedRoleType, selectedRoles, token]);

  useEffect(() => {
    if (props.userClickedNext) props.onGoNext?.();
  }, [props.userClickedNext]);

  switch (selectedRoleType === '') {
    case true:
      return (
        <>
          <h3 className={cls(fonts.raleway, 'fs-1 family-raleway fw-bold mb-5')}>
            What role describes you?
          </h3>
          <RadioOptions<(typeof roleTypes)[0]>
            options={roleTypes}
            name="role_type"
            onChange={ev => setSelectedRoleType(ev.target.value as typeof selectedRoleType)}
            value={selectedRoleType || ''}
            className="list-style-none d-flex justify-content-center gap-5 flex-wrap"
            labelElementClassName={cls(styles.roleType, 'cursor-pointer')}
            render={(optn: (typeof roleTypes)[0]) => (
              <RoleTypeOption option={optn} isSelected={selectedRoleType === optn.value} />
            )}
          />
        </>
      );

    default:
      props.showNextButton();
      const roles = classifiedRoles[selectedRoleType as RoleTypes];
      const img = roleTypes.find(r => r.value === selectedRoleType)!.img;
      return (
        <>
          <h3
            className={cls(fonts.raleway, 'fs-1 family-raleway fw-bold mb-5 text-center')}
            style={{ maxWidth: '30ch' }}
          >
            Select up to three key roles that best fit the described processes
          </h3>
          <h6
            className="fs-2 color-pry family-raleway fw-bold mb-7 text-center"
            style={{ maxWidth: '30ch' }}
          >
            {selectedRoleType}
          </h6>

          <div className="d-flex rounded-3 shadow" style={{ minHeight: 'max-content' }}>
            <figure className="bg-pry-light h-100 px-5 flex-center rounded-start-3">
              <img src={img} alt="" className="mx-4" />
            </figure>

            <CheckboxOptions
              as="tag"
              options={roles.map(r => ({ label: r, value: r }))}
              selectedOptions={selectedRoles.map(r => ({ label: r, value: r }))}
              className="d-flex align-items-center flex-wrap list-style-none p-5 h-100"
              onChange={r =>
                (selectedRoles.includes(r as string) ? removeRole : addRole)(r as string)
              }
              useDefaultMaxWidth
            />
            <TagsInput />
          </div>
        </>
      );
  }
};

export default ChooseRoles;
