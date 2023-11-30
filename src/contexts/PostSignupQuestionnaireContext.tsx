import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  createContext,
  useEffect
} from 'react';
import useRequest from '../hooks/useRequest';
import api from '../library/api';
import useSignedInUser from '../hooks/useSignedInUser';

interface QuestionnaireContextData {
  overlayShown: boolean;
  setOverlayShown: Dispatch<SetStateAction<boolean>> | undefined;
  user?: UserPublicProfile;
  updateUser?: (body: Partial<UserPublicProfile>) => void;
  isUpdatingUser: boolean;
  welcomeModalShown: boolean;
  setShowWelcomeModal: Dispatch<SetStateAction<boolean>> | undefined;
}

const QuestionnaireContext = createContext<QuestionnaireContextData>({
  overlayShown: false,
  setOverlayShown: undefined,
  welcomeModalShown: false,
  setShowWelcomeModal: undefined,
  isUpdatingUser: false
});

const QuestionnaireContextProvider: FC<{ children: ReactNode }> = props => {
  const { accessToken, modifyUserObject } = useSignedInUser();
  const {
    sendReq: sendUpdateReq,
    loading: isUpdatingUser,
    response: updateResponse,
    loaded: userUpdated
  } = useRequest<{ status: 'USER_UPDATED' | 'fail' | 'error'; user?: UserPublicProfile }>();

  const [overlayShown, setOverlayShown] = useState(false);
  const [welcomeModalShown, setShowWelcomeModal] = useState(false);

  const updateUser = async (body: Partial<UserPublicProfile>) => {
    console.log({ accessToken });
    if (!accessToken) return;
    const req = api.updateUser(body, accessToken);
    sendUpdateReq(req);
  };

  useEffect(() => {
    if (!updateResponse || !updateResponse.user) return;
    modifyUserObject(updateResponse.user);
  }, [updateResponse]);

  return (
    <QuestionnaireContext.Provider
      value={{
        updateUser,
        isUpdatingUser,
        overlayShown,
        setOverlayShown,
        welcomeModalShown,
        setShowWelcomeModal
      }}
    >
      {props.children}
    </QuestionnaireContext.Provider>
  );
};

export const usePostSignupQuestionnaireContext = () =>
  useContext<QuestionnaireContextData>(QuestionnaireContext);

export default QuestionnaireContextProvider;
