import React, { useState, useEffect } from 'react';
// Hooks
import useInput from '../../../hooks/useInput';
import useList from '../../../hooks/useList';
// Utils
import cls from 'classnames';
import { STARTUP_INDUSTRIES, STARTUP_STAGES } from './utils';
import {
  isEmail,
  isRequired,
  mustNotBeSameAs
} from '../../../utils/validators/inputValidators';
// Components
import { Form } from 'react-bootstrap';
import CheckboxOptions from '../../ui/checkboxes/CheckboxOptions';
import CheckboxWithCustomInputs from '../../ui/checkboxes/TagsInput';
import TextField from '../../ui/text-field/TextField';
import RadioOptions from '../../ui/radio/RadioOptions';
import AppRadio from '../../ui/radio/AppRadio';
import CheckboxTag from '../../ui/checkboxes/CheckboxTag';
import TagsInput from '../../ui/checkboxes/TagsInput';
import api from '../../../library/api';
import useSignedInUser from '../../../hooks/useSignedInUser';
import WelcomeModal from '../welcome/WelcomeModal';
import { usePostSignupQuestionnaireContext } from '../../../contexts/PostSignupQuestionnaireContext';

const StartupInfo = () => {
  const { accessToken, user } = useSignedInUser();
  // const {} = usePostSignupQuestionnaireContext()

  const { inputValue: userHasStartupIdea, onChange: handleChangeUserHasStartupIdea } =
    useInput({ init: '' });

  const {
    inputValue: ideaName,
    onChange: handleChangeIdeaName,
    validationErrors: ideaNameValidationErrors,
    runValidators: runIdeaNameValidators,
    pushValidationError: pushIdeaNameValidationError
  } = useInput({ init: user?.startupIdea?.name || '' });

  const {
    items: selectedIndustries,
    addItem: addIndustry,
    removeItem: removeIndustry
  } = useList(user?.startupIdea?.industries);

  const { inputValue: userHasStartup, onChange: handleChangeUserHasStartup } = useInput({
    init: ''
  });

  const {
    inputValue: startupName,
    onChange: handleChangeStartupName,
    validationErrors: startupNameValidationErrors,
    runValidators: runStartupNameValidators,
    pushValidationError: pushStartupNameValidationError
  } = useInput({ init: user?.startup?.name || '' });

  const {
    inputValue: stage,
    onChange: handleChangeStage,
    setInputValue: setStage,
    validationErrors: stageValidationErrors,
    pushValidationError: pushStageValidationError
  } = useInput<string>({
    init: user?.startup?.stage || '',
    validators: [{ fn: mustNotBeSameAs, params: ['other', 'Cannot be empty'] }]
  });

  useEffect(() => {
    return () => {
      const body: Partial<UserPublicProfile> = {
        startupIdea: { name: ideaName, industries: selectedIndustries },
        startup: {
          name: startupName,
          stage: stage.toLowerCase().includes('other') ? stage.split(':')[1] : stage
        }
      };
      api.updateUser(body, accessToken!);
    };
  }, [ideaName, selectedIndustries, startupName, stage]);

  return (
    <>
      <h3
        className="fs-1 family-raleway fw-bold mb-5 text-center"
        style={{ maxWidth: '30ch' }}
      >
        Startup Information
      </h3>

      <form
        className="d-flex flex-column align-items-center gap-5 shadow rounded-3 p-6"
        style={{ minWidth: '450px' }}
      >
        <div className="w-100">
          <Form.Label className="fw-bold fs-4 text-black" htmlFor="phone">
            Do you have an idea for a startup?
          </Form.Label>

          <RadioOptions
            name="has_startup_idea"
            value={userHasStartupIdea || ''}
            options={[{ value: 'Yes' }, { value: 'No' }]}
            onChange={handleChangeUserHasStartupIdea}
            className="d-flex align-items-center gap-4"
            render={optn => (
              <CheckboxTag label={optn.value} active={userHasStartupIdea === optn.value} />
            )}
          />
        </div>

        <TextField
          value={ideaName}
          onChange={handleChangeIdeaName}
          label="Add idea name*"
          placeholder="Idea name"
          className={cls(userHasStartupIdea.toLowerCase() === 'yes' ? 'w-100' : 'd-none')}
          validationErrors={ideaNameValidationErrors}
          inputClassName="textfield-sm border"
        />

        <div className={cls(userHasStartupIdea.toLowerCase() === 'yes' ? 'w-100' : 'd-none')}>
          <Form.Label className="fw-bold fs-4 text-black" htmlFor="phone">
            In which industry is your idea?
          </Form.Label>
          <CheckboxOptions
            as="tag"
            options={STARTUP_INDUSTRIES.map(ind => ({ label: ind, value: ind }))}
            selectedOptions={selectedIndustries.map(ind => ({ label: ind, value: ind }))}
            useDefaultMaxWidth
            onChange={optn =>
              (selectedIndustries.includes(optn as string) ? removeIndustry : addIndustry)(
                optn as string
              )
            }
          />
        </div>

        <div className="w-100">
          <Form.Label className="fw-bold fs-4 text-black" htmlFor="phone">
            Do you have a startup?
          </Form.Label>
          <RadioOptions
            name="has_startup_idea"
            value={userHasStartup || ''}
            options={[{ value: 'Yes' }, { value: 'No' }]}
            onChange={handleChangeUserHasStartup}
            className="d-flex align-items-center gap-4"
            render={optn => (
              <CheckboxTag label={optn.value} active={userHasStartup === optn.value} />
            )}
          />
        </div>

        <TextField
          value={startupName}
          onChange={handleChangeStartupName}
          label="Add startup name *"
          placeholder="Startup name"
          className={cls(userHasStartup.toLowerCase() === 'yes' ? 'w-100' : 'd-none')}
          validationErrors={startupNameValidationErrors}
          inputClassName="textfield-sm border"
        />

        <div className={cls(userHasStartup.toLowerCase() === 'yes' ? 'w-100' : 'd-none')}>
          <Form.Label className="fw-bold fs-4 text-black" htmlFor="phone">
            At which stage is your startup currently?
          </Form.Label>
          <RadioOptions
            name="startup_stage"
            value={stage || ''}
            options={STARTUP_STAGES.map((item, i, arr) => ({
              label: item,
              value: i === arr.length - 1 ? 'other' : item
            }))}
            onChange={handleChangeStage}
            className="d-flex flex-wrap gap-2"
            style={{ maxWidth: '40rem' }}
            render={optn => <CheckboxTag label={optn.label} active={stage === optn.value} />}
          />
          <TagsInput
            show={stage.toLowerCase().includes('other')}
            onChange={tags => tags.length && setStage('other:' + tags[0])}
            containerClassName="mt-5"
            validationErrors={stageValidationErrors}
            onExisting={tag => pushStageValidationError(`"${tag}" has already been added`)}
            beforeAddValidate={(newTag, existingTags) => {
              if (existingTags.length === 1) {
                pushStageValidationError('Only one input allowed');
                return false;
              }
              if (STARTUP_STAGES.some(stg => stg.toLowerCase() === newTag.toLowerCase())) {
                pushStageValidationError(`"${newTag}" already exists as an option above`);
                return false;
              }
              return true;
            }}
          />
        </div>
      </form>
    </>
  );
};

export default StartupInfo;
