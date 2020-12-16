export const required = value => {
  return value ? undefined :  'Field is required';
}

export const minLengthCreator = minLenght => value => {
  return value.length < minLenght ?  `Minlength ${minLenght} symbols` : undefined;
}

export const passwordsMatch = (value, allValues) => {
  return value !== allValues.password ? 'Passwords don\'t match' : undefined;
}

export const passwordPattern = value => {
  return value && !/^[а-яёa-z0-9]+$/i.test(value) ? `Invalid password should contain only letters and digits` : undefined;
}

export const emailPattern = value => {
  return value && !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value) ? `Invalid email` : undefined;
}

export const authorsPattern = value => {
  return value && !/^[а-яёa-z.,;-]+[а-яёa-z.,;-\s]+$/i.test(value) ? `Invalid string
  should contain only letters and ".,-;"` : undefined;
}

export const bookPattern = value => {
  return value && !/^[а-яёa-z0-9]+/i.test(value) ? `Invalid titile` : undefined;
}

export const dateNotFuture = value => {
  return new Date(value) > new Date() ? 'Date can\'t be in future' : undefined; 
}

export const onlyNumbers = value => {
  return value && !/^[0-9]+$/.test(value) ? `Should contain only numbers` : undefined;
}

export const ISBNDateControl = (value, allValues) => {
  const formatChangeDate = new Date(2007, 0, 1, 0, 0, 0, 0);
  const formDate = new Date(allValues.date);

  if (formDate) {
    if (formDate > formatChangeDate) {
      return value.length !== 13 && 'from this date should contain 13 digits';
    }

    if (formDate <= formatChangeDate) {
      return value.length !== 10 && 'from this date should contain 10 digits';
    }
  }
}