

export const login = (data) => (
    {
        type: "login",
        data
    }
);
export const get = (data) => (
    {
        type: "get",
        data
    }
);
export const put = (data,index) => (
    {
        type: "put",
        data,
        index
    }
);
export const post = (data) => (
    {
        type: "post",
        data
    }
);
export const deleteIt = (index) => (
    {
        type: "delete",
        index
    }
);
export const signoutAction = (data) => (
    {
        type: "signouts",
    }
);
export const incr = () => (
    {
        type: "incr"
    }
);
