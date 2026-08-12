import {
    ZipCloudResponse,
    ZipCloudResponseError,
    ZipCloudResponseOk,
} from '@/presentation/backend-lib/zipcloud/zipcloud.types';

export function isOk(zipCloudResponse: ZipCloudResponse): zipCloudResponse is ZipCloudResponseOk {
    return zipCloudResponse.status === 200;
}

export function isError(zipCloudResponse: ZipCloudResponse): zipCloudResponse is ZipCloudResponseError {
    return zipCloudResponse.status !== 200;
}
