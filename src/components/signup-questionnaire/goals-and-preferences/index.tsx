import React, { useEffect, useState } from 'react';
import { GOALS } from './utils';
import useList from '../../../hooks/useList';
import { Form } from 'react-bootstrap';
import cls from 'classnames';
import styles from './styles.module.scss';
import TagsInput from '../../ui/checkboxes/TagsInput';
import CheckboxTag from '../../ui/checkboxes/CheckboxTag';
import useSignedInUser from '../../../hooks/useSignedInUser';
import api from '../../../library/api';
import { toTitleCase } from '../../../utils/string-utils';
import CheckboxOptions from '../../ui/checkboxes/CheckboxOptions';
import { usePostSignupQuestionnaireContext } from '../../../contexts/PostSignupQuestionnaireContext';

const GoalsAndPreferences = function () {
  const { user, accessToken } = useSignedInUser();
  const { items: selectedGoals, addItem: addGoal, removeItem: removeGoal } = useList();
  const { updateUser } = usePostSignupQuestionnaireContext();

  const { items: otherItems, setItems: setOtherItems } = useList();

  useEffect(() => {
    return () => {
      const body = {
        goals: selectedGoals
          .filter(p => p !== 'other')
          .concat(otherItems.map(word => toTitleCase(word)))
      };
      updateUser?.(body);
    };
  }, [selectedGoals, otherItems, accessToken]);

  return (
    <>
      <h3
        className="fs-1 family-raleway fw-bold mb-3 text-center"
        style={{ maxWidth: '30ch' }}
      >
        Goals and Preferences
      </h3>
      <small className="parag d-block text-center mb-8" style={{ maxWidth: '45ch' }}>
        Please select or check up to three items that you would like to achieve from using the
        application.
      </small>

      <div
        className={cls('shadow p-5 h-100')}
        style={{ minWidth: '50rem', maxWidth: '50rem' }}
      >
        <CheckboxOptions
          className="justify-content-cente mb-5"
          as="tag"
          options={GOALS.map((g, i, arr) => ({
            label: g,
            value: i === arr.length - 1 ? 'other' : g
          }))}
          selectedOptions={selectedGoals.map(g => ({ label: g, value: g }))}
          onChange={goal =>
            (selectedGoals.includes(goal as string) ? removeGoal : addGoal).call(
              null,
              goal as string
            )
          }
        />
        <TagsInput
          show={!!otherItems.length || selectedGoals.includes('other')}
          containerClassName=""
          onChange={setOtherItems}
          // beforeAddValidate={(tag, existingTags) => {

          // }}
        />
      </div>
    </>
  );
};

export default GoalsAndPreferences;
