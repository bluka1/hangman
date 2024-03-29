import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUsername } from '../../services/stores';
import { Button } from '..';

const UsernameForm = () => {
  const [formUsername, setFormUsername] = useState<string>('');
  const dispatch = useDispatch();
  const userNameRegex = /^[a-zA-Z]{1,20}$/;

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userNameRegex.test(formUsername.trim())) return;
    dispatch(setUsername(formUsername));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUsername(e.target.value);
  };

  console.log('test regex: ', userNameRegex.test(formUsername));

  return (
    <form
      onSubmit={handleOnSubmit}
      className="username-form"
      autoComplete="off"
    >
      <label htmlFor="username" className="username-form-input-label">
        Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formUsername}
        onChange={handleInputChange}
        className="username-form-input"
        autoComplete="off"
      />
      <Button
        text="SUBMIT"
        isDisabled={!userNameRegex.test(formUsername)}
        handleClick={handleOnSubmit}
      />
    </form>
  );
};

export default UsernameForm;
