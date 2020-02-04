export function signInRequest({ token, email, nome }) {
    return {
        type: '@auth/SIGN_IN_REQUEST',
        payload: {
            token,
            email,
            nome,
        },
    };
}

export function signIn({ token, email, nome }) {
    return {
        type: '@auth/SIGN_IN_SUCCESS',
        payload: {
            token,
            email,
            nome,
        },
    };
}

export function signOut() {
    return {
        type: '@auth/SIGN_OUT',
        paylod: {},
    };
}
