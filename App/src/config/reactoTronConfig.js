import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
    const tron = Reactotron.configure()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}
