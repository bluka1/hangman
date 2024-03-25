import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUsername } from '../../services/stores';
import { Button } from '..';

import './UsernameForm.css';

const UsernameForm = () => {
  const [formUsername, setFormUsername] = useState<string>('');
  const dispatch = useDispatch();

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formUsername.trim()) return;
    dispatch(setUsername(formUsername));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormUsername(e.target.value);
  };

  return (
    <form onSubmit={handleOnSubmit} className="username-form">
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
      />
      <Button text="SUBMIT" isDisabled={!formUsername.trim()} />
    </form>
  );
};

export default UsernameForm;
