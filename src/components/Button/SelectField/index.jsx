import React from "react";
import { classNames } from "../../../utils/classNames";

const transTypes = [
  { id: "", type: "- Select Transaction Types -" },
  { id: 1, type: "Debit" },
  { id: 2, type: "Credit" },
];

export const banks = [
  { id: 1, bankName: "SunTrust Bank" },
  { id: 2, bankName: "Access Bank" },
  { id: 3, bankName: "UBA" },
  { id: 4, bankName: "First Bank" },
];

export const sunTrustBank = [
  { id: 1, bankName: "SunTrust Bank" }
];

const branchCodes = [
  { id: 1, code: "73" },
  { id: 2, code: "10" },
  { id: 3, code: "03" },
  { id: 4, code: "04" },
  { id: 5, code: "09" },
];

const codes = [
  { id: 3, code: "03" },
  { id: 4, code: "04" },
  { id: 5, code: "09" },
];

const accountSystems = [
  { id: "Regular", accountSystem: "Regular Account Number" },
  { id: "Nuban", accountSystem: "Nuban" },
];

export const TransactionTypeOptions = () => {
  return transTypes?.map((type) => {
    return (
      <option key={type.id} value={type.type}>
        {type.type}
      </option>
    );
  });
};

export const bankOptions = () => {
  return banks?.map((bank) => {
    return (
      <option key={bank.id} value={bank.bankName}>
        {bank.bankName}
      </option>
    );
  });
};

export const sunTrustBankOptions = (banks) => {
  return banks?.map((bank) => {
    return (
      <option key={bank.institutioncode} value={bank.institutionname}>
        {bank.institutionname}
      </option>
    );
  });
};

export const branchCodesOptions = () => {
  return branchCodes?.map((code) => {
    return (
      <option key={code.id} value={code.code}>
        {code.code}
      </option>
    );
  });
};

export const codesOptions = () => {
  return codes?.map((code) => {
    return (
      <option key={code.id} value={code.code}>
        {code.code}
      </option>
    );
  });
};

export const accountNumOptions = () => {
  return accountSystems?.map((system) => {
    return (
      <option key={system.accountSystem} value={system.accountSystem}>
        {system.accountSystem}
      </option>
    );
  });
};

function SelectInput({
  label,
  register,
  className,
  onChange,
  errors,
  optionsFunction,
  name,
  formClass,
  required,
  selectSample,
}) {
  return (
    <div className={className}>
      <div className="form-group">
        <label className="col-form-label">
          {label}
          <span className="text-danger">*</span>
        </label>
        <select
          name={name}
          onChange={onChange}
          {...register(name, {
            required,
          })}
          className={classNames(errors ? "error-class" : "", formClass)}
        >
          <option value="">{selectSample}</option>
          {optionsFunction}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;
