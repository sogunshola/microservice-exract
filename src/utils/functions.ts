import { extname } from 'path';
import slugify from 'slugify';
import { SERVER_URL } from 'src/shared/constants';
import { decode, encode } from 'uuid-base58';

/* export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(
    null,
    `${generateSlug(name)}_${generateSlug(randomName)}${fileExtName}`,
  );
}; */

export function generateSlug(name: string) {
  return slugify(name, { lower: true, replacement: '_' });
}

export function decodeCustomId(id: string) {
  const arr = id.split('_');
  return decode(arr[arr.length - 1]);
}

export function generateString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/* export function FileUrl(filename: string) {
  return SERVER_URL + 'uploads/' + filename;
} */

/* export function processPaginationPayload(pagination: Pagination) {
  pagination.limit = pagination.limit > 0 ? pagination.limit : 10;
  pagination.page = pagination.page > 0 ? pagination.page : 1;
  return {
    skipped: Number((pagination.page - 1) * pagination.limit),
    page: Number(pagination.page),
    limit: Number(pagination.limit),
    total: 0,
  };
} */
