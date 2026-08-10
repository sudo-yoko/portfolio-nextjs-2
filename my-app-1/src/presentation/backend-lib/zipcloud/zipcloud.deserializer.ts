import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

import { Deserializer } from '@/presentation/_system/client/client.deserializer';
import { tbSchema, tbUtil } from '@/presentation/_system/io/deserialize.typebox';
import {
    ZipCloudResponse,
    ZipCloudResponseError,
    ZipCloudResponseOk,
    ZipCloudResponseStatus,
    ZipCloudResult,
} from '@/presentation/backend-lib/zipcloud/zipcloud.types';

function withTypeBox(): Deserializer<ZipCloudResponse> {
    const statusSchema = tbSchema<ZipCloudResponseStatus>(
        Type.Object({
            status: Type.Number(),
        }),
    );
    const resultSchema = tbSchema<ZipCloudResult>(
        Type.Object({
            zipcode: Type.String(),
            prefcode: Type.String(),
            address1: Type.String(),
            address2: Type.String(),
            address3: Type.String(),
            kana1: Type.String(),
            kana2: Type.String(),
            kana3: Type.String(),
        }),
    );
    const okSchema = tbSchema<ZipCloudResponseOk>(
        Type.Object({
            status: Type.Literal(200),
            results: Type.Union([Type.Array(resultSchema), Type.Null()]),
        }),
    );
    const errorSchema = tbSchema<ZipCloudResponseError>(
        Type.Object({
            status: Type.Union([Type.Literal(400), Type.Literal(500)]),
            message: Type.String(),
        }),
    );
    const deserializer: Deserializer<ZipCloudResponse> = (rawBody) => {
        const json: unknown = JSON.parse(rawBody);
        console.log('★' + JSON.stringify(json, null, 2));
        return tbUtil.withErrorHandling(() => {
            const status = Value.Decode(statusSchema, json);
            if (status.status === 200) {
                return Value.Decode(okSchema, json);
            } else {
                return Value.Decode(errorSchema, json);
            }
        });
    };
    return deserializer;
}

export const deserialize: Deserializer<ZipCloudResponse> = withTypeBox();
