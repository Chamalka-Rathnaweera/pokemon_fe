import { useEffect, useState } from "react";
import { Amplify } from 'aws-amplify';
// import awsExports from "../aws/aws.exports";
import { Auth } from 'aws-amplify';
import { awsExports } from "../Auth/aws-exports";

const useGetToken = (url) => {
    const [token, setToken] = useState('')
    Amplify.configure({
        Auth: {
            region: awsExports.REGION,
          userPoolId: awsExports.USER_POOL_ID,
          userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
        }
    })
    const fetchJwtToken = async () => {
        try {
            const session = await Auth.currentSession();
            const token = session.getIdToken().getJwtToken();
            setToken(token);
            console.log(token)
        } catch (error) {
            console.log('Error fetching JWT token:', error);
        }
    };
    useEffect(() => {
        fetchJwtToken()
    }, [])
    return { token }
}
export default useGetToken;