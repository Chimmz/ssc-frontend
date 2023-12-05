import React, { FC, useEffect, useState } from 'react';
import TextField from '../../ui/text-field/TextField';
import useInput from '../../../hooks/useInput';
import { isRequired, isValidDate } from '../../../utils/validators/inputValidators';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  CountrySelect,
  StateSelect,
  CitySelect,
  Country,
  State,
  City
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import useSignedInUser from '../../../hooks/useSignedInUser';
import api from '../../../library/api';
import { OCCUPATION_LIST } from './utils';
import { StepComponentProps } from '@/components/shared/multistep-component/withStepNavigation';
import cls from 'classnames';
import fonts from '@/app/fonts';

const PersonalInfo: FC<StepComponentProps> = props => {
  const user = useSignedInUser();
  const [startDate, setStartDate] = useState(new Date());

  const {
    inputValue: fullname,
    onChange: handleChangeFullname,
    setInputValue: setFullname,
    validationErrors: fullnameValidationErrors,
    runValidators: runFullnameValidators
  } = useInput<string>({
    init: '',
    validators: [{ fn: isRequired, params: [] }]
  });

  const {
    inputValue: dob,
    setInputValue: setDob,
    validationErrors: dobValidationErrors,
    runValidators: runDobValidators
  } = useInput<Date>({
    init: user?.personalInfo?.dateOfBirth
      ? new Date(user.personalInfo.dateOfBirth)
      : new Date(),
    validators: [{ fn: isValidDate, params: [] }]
  });

  const [originCountry, setOriginCountry] = useState<Partial<Country> | undefined>(() => {
    if (user?.personalInfo?.originCountry) return { name: user.personalInfo.originCountry };
  });
  const [currentCountry, setCurrentCountry] = useState<Partial<Country> | undefined>(() => {
    if (user?.personalInfo?.countryOfResidence)
      return { name: user.personalInfo.countryOfResidence };
  });
  const [currentState, setCurrentstate] = useState<Partial<State> | undefined>(() => {
    if (user?.personalInfo?.stateOfResidence)
      return { name: user.personalInfo.stateOfResidence };
  });
  const [currentCity, setCurrentCity] = useState<Partial<City> | undefined>(() => {
    if (user?.personalInfo?.cityOfResidence)
      return { name: user.personalInfo.cityOfResidence };
  });

  useEffect(() => {
    if (user.isSignedIn) setFullname(user!.firstName! + ' ' + user!.lastName!);
  }, [user.isSignedIn]);

  const validateFields = () => {
    const validations = [runFullnameValidators(), runDobValidators()];
    return validations.every(v => !v.errorExists);
  };

  useEffect(() => {
    if (!props.userClickedNext) return;
    if (validateFields()) props.onGoNext?.();
  }, [props.userClickedNext]);

  useEffect(() => {
    props.setUserClickedNext?.(false);
  }, [fullname, dob]);

  // const {
  //   inputValue: occupation,
  //   onChange: handleChangeOccupation,
  //   validationErrors: occupationValidationErrors,
  //   runValidators: runOccupationValidators
  // } = useInput({
  //   init: user?.personalInfo?.occupation || '',
  //   validators: [{ fn: isRequired, params: [] }]
  // });

  useEffect(() => {
    return () => {
      const body = {
        personalInfo: {
          dateOfBirth: String(dob),
          originCountry: originCountry?.name,
          countryOfResidence: currentCountry?.name,
          cityOfResidence: currentCity?.name,
          stateOfResidence: currentState?.name
        }
      };
      api.updateUser(body, user.token!);
    };
  }, [dob, currentCountry, currentCity, currentState, user.token]);

  return (
    <>
      <h3
        className={cls(fonts.raleway, 'fs-1 family-raleway fw-bold mb-5 text-center')}
        style={{ maxWidth: '30ch' }}
      >
        Personal Information
      </h3>

      <form
        className="d-flex flex-column align-items-center gap-5 shadow rounded-3 p-6"
        style={{ minWidth: '450px' }}
      >
        <TextField
          value={fullname}
          onChange={handleChangeFullname}
          validationErrors={fullnameValidationErrors}
          label="Full name"
          className="w-100"
          inputClassName="textfield-sm border"
        />
        {/* <TextField
          value={dob}
          onChange={handleChangeDob}
          validationErrors={dobValidationErrors}
          label="Date of Birth (DOB)"
          className="w-100"
          inputClassName="textfield-sm border"
        /> */}
        <div className="w-100">
          <Form.Label htmlFor="dob" className="fw-bold d-block">
            Date of Birth (DOB)
          </Form.Label>
          <DatePicker
            selected={dob}
            onChange={date => setDob(date!)}
            className="d-block w-100 textfield border"
            id="dob"
            placeholderText="DD/MM/YY"
          />
        </div>

        {/* Country of Origin */}
        <div className="w-100">
          <Form.Label className="fw-bold">Citizenship</Form.Label>
          <CountrySelect
            // defaultValue={{ name: 'South Korea' }}
            onChange={setOriginCountry}
            containerClassName=" p-0 border-none"
            inputClassName="px-2 border-none"
          />
        </div>

        {/* Current Country & City */}
        <div className="w-100">
          <Form.Label className="fw-bold">Current Country & City</Form.Label>
          <CountrySelect
            onChange={setCurrentCountry}
            containerClassName="textfield p-0 border-none mb-2"
            inputClassName="px-2 border-none"
            placeHolder="Search countries"
          />
          <div className="d-flex align-items-center gap-2">
            <StateSelect
              countryid={currentCountry?.id}
              onChange={setCurrentstate}
              containerClassName="textfield p-0 border-none"
              inputClassName="px-2 border-none"
              placeHolder="Search states"
            />
            <CitySelect
              countryid={currentCountry?.id}
              stateid={currentState?.id}
              onChange={setCurrentCity}
              containerClassName="textfield p-0 border-none"
              inputClassName="px-2 border-none"
              placeHolder="Search cities"
            />
          </div>
        </div>

        {/* Occupation */}
        {/* <div className="w-100">
          <Form.Label className="fw-bold">Occupation</Form.Label>
          <Form.Select
            value={occupation}
            onChange={handleChangeOccupation}
            className="textfield border cursor-pointer"
            isInvalid={false}
          >
            <option value="">Please select an occupation</option>
            {OCCUPATION_LIST.map(occ => (
              <option value={occ} key={occ}>
                {occ}
              </option>
            ))}
          </Form.Select>
        </div> */}
      </form>
    </>
  );
};

export default PersonalInfo;
