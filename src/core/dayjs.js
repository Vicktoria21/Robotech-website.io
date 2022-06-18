import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

import { DATE_LOCALE } from '../constants/application-constants';

dayjs.locale(DATE_LOCALE);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

// eslint-disable-next-line unicorn/prefer-export-from
export default dayjs;


