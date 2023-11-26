import {accountType, genderOptions} from './dropdown-options';

export const basicDetail = [
  {
    label: 'First Name',
    value: 'Abhinav',
    id: 'firstName',
    type: 'text',
  },
  {
    label: 'Last Name',
    value: 'Sahai',
    id: 'lastName',
    type: 'text',
  },
  {
    label: 'Gender',
    value: 'Male',
    id: 'gender',
    type: 'radio',
    options: genderOptions,
  },
  {
    label: 'Date of birth',
    value: '2001-10-27',
    id: 'dateOfBirth',
    type: 'datePicker',
  },
  {
    label: 'Email',
    value: 'abhi@gmail.com',
    id: 'email',
    type: 'text',
  },
  {
    label: 'Mobile no',
    value: '8448774634',
    id: 'contactNo',
    type: 'number',
    length: 10,
  },
  {
    label: 'Address',
    value: 'Noida, Uttar pradesh',
    id: 'address',
    type: 'text',
  },
];
export const insuranceDetail = [
  {
    label: 'Insurance No',
    value: '6545676789',
    type: 'number',
    id: 'insuranceNo',
    length: 10,
  },
  {
    label: 'Father name',
    value: 'Dilip kumar singh',
    type: 'text',
    id: 'fatherName',
  },
  {label: 'Bank name', value: 'HDFC bank', type: 'text', id: 'bankName'},
  {
    label: 'Account no',
    value: '3923423043',
    type: 'number',
    id: 'accountNumber',
  },
  {label: 'IFSC code', value: 'SBIN00520', type: 'text', id: 'ifscCode'},
  {
    label: 'Account type',
    value: 'Savings',
    type: 'dropdown',
    options: accountType,
    id: 'accountType',
  },
  {label: 'Aadhar no', value: '254537941481', type: 'number', id: 'aadharNo'},
];

export const providentDetail = [
  {
    label: 'UAN no',
    value: '3425324234234234',
    id: 'uanNO',
    type: 'number',
  },
  {
    label: 'PF no',
    value: '432234234',
    id: 'pfNo',
    type: 'number',
  },
];
