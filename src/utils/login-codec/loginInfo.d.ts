import * as $protobuf from "protobufjs";
/** Namespace imparse. */
export namespace imparse {

    /** Namespace auth. */
    namespace auth {

        /** Device enum. */
        enum Device {
            Android = 0,
            IOS = 1,
            Windows = 2,
            Linux = 3,
            MacOS = 4,
            Web = 5
        }

        /** Properties of a Login. */
        interface ILogin {

            /** Login device */
            device?: (imparse.auth.Device|null);

            /** Login username */
            username?: (string|null);

            /** Login deviceToken */
            deviceToken?: (string|null);

            /** Login connType */
            connType?: (imparse.auth.Login.ConnType|null);

            /** Login uuid */
            uuid?: (string|null);

            /** Login deviceName */
            deviceName?: (string|null);
        }

        /** Represents a Login. */
        class Login implements ILogin {

            /**
             * Constructs a new Login.
             * @param [properties] Properties to set
             */
            constructor(properties?: imparse.auth.ILogin);

            /** Login device. */
            public device: imparse.auth.Device;

            /** Login username. */
            public username: string;

            /** Login deviceToken. */
            public deviceToken: string;

            /** Login connType. */
            public connType: imparse.auth.Login.ConnType;

            /** Login uuid. */
            public uuid: string;

            /** Login deviceName. */
            public deviceName: string;

            /**
             * Creates a new Login instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Login instance
             */
            public static create(properties?: imparse.auth.ILogin): imparse.auth.Login;

            /**
             * Encodes the specified Login message. Does not implicitly {@link imparse.auth.Login.verify|verify} messages.
             * @param message Login message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: imparse.auth.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Login message, length delimited. Does not implicitly {@link imparse.auth.Login.verify|verify} messages.
             * @param message Login message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: imparse.auth.ILogin, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Login message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): imparse.auth.Login;

            /**
             * Decodes a Login message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): imparse.auth.Login;

            /**
             * Verifies a Login message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Login message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Login
             */
            public static fromObject(object: { [k: string]: any }): imparse.auth.Login;

            /**
             * Creates a plain object from a Login message. Also converts values to other types if specified.
             * @param message Login
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: imparse.auth.Login, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Login to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace Login {

            /** ConnType enum. */
            enum ConnType {
                Connect = 0,
                Reconnect = 1
            }
        }
    }
}
