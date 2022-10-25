import { useRouteError } from 'react-router-dom';
const NotFound = () => {
    const error: any = useRouteError();
    return (
        <section>
            <div>Oops go back</div>
            <h4>{error.statusText || error.message}</h4>
        </section>
    );
};

export default NotFound;
