"use client";

import AuthForm from "src/app/components/AuthForm/AuthForm";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/app/redux-toolkit/store";
import { setFormType } from "src/app/redux-toolkit/userStates";

function Authentication() {
  const dispatch = useDispatch();
  const formType = useSelector((state: RootState) => state.userStates.formType);

  return (
    <AuthForm
      formType={formType}
      setFormType={(type) => dispatch(setFormType(type))}
    />
  );
}

export default Authentication;
