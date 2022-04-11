/* eslint-disable */
import * as $protobuf from 'protobufjs'
/** Namespace chat33. */
export namespace chat33 {
    /** Namespace comet. */
    namespace comet {
        /** Properties of an AuthMsg. */
        interface IAuthMsg {
            /** AuthMsg appId */
            appId?: string | null

            /** AuthMsg token */
            token?: string | null

            /** AuthMsg ext */
            ext?: Uint8Array | null
        }

        /** Represents an AuthMsg. */
        class AuthMsg implements IAuthMsg {
            /**
             * Constructs a new AuthMsg.
             * @param [properties] Properties to set
             */
            constructor(properties?: chat33.comet.IAuthMsg)

            /** AuthMsg appId. */
            public appId: string

            /** AuthMsg token. */
            public token: string

            /** AuthMsg ext. */
            public ext: Uint8Array

            /**
             * Creates a new AuthMsg instance using the specified properties.
             * @param [properties] Properties to set
             * @returns AuthMsg instance
             */
            public static create(properties?: chat33.comet.IAuthMsg): chat33.comet.AuthMsg

            /**
             * Encodes the specified AuthMsg message. Does not implicitly {@link chat33.comet.AuthMsg.verify|verify} messages.
             * @param message AuthMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: chat33.comet.IAuthMsg, writer?: $protobuf.Writer): $protobuf.Writer

            /**
             * Encodes the specified AuthMsg message, length delimited. Does not implicitly {@link chat33.comet.AuthMsg.verify|verify} messages.
             * @param message AuthMsg message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: chat33.comet.IAuthMsg, writer?: $protobuf.Writer): $protobuf.Writer

            /**
             * Decodes an AuthMsg message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns AuthMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): chat33.comet.AuthMsg

            /**
             * Decodes an AuthMsg message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns AuthMsg
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): chat33.comet.AuthMsg

            /**
             * Verifies an AuthMsg message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string | null

            /**
             * Creates an AuthMsg message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns AuthMsg
             */
            public static fromObject(object: { [k: string]: any }): chat33.comet.AuthMsg

            /**
             * Creates a plain object from an AuthMsg message. Also converts values to other types if specified.
             * @param message AuthMsg
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(
                message: chat33.comet.AuthMsg,
                options?: $protobuf.IConversionOptions
            ): { [k: string]: any }

            /**
             * Converts this AuthMsg to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any }
        }
    }
}
