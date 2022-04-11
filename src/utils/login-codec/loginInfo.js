/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const imparse = $root.imparse = (() => {

    /**
     * Namespace imparse.
     * @exports imparse
     * @namespace
     */
    const imparse = {};

    imparse.auth = (function() {

        /**
         * Namespace auth.
         * @memberof imparse
         * @namespace
         */
        const auth = {};

        /**
         * Device enum.
         * @name imparse.auth.Device
         * @enum {number}
         * @property {number} Android=0 Android value
         * @property {number} IOS=1 IOS value
         * @property {number} Windows=2 Windows value
         * @property {number} Linux=3 Linux value
         * @property {number} MacOS=4 MacOS value
         * @property {number} Web=5 Web value
         */
        auth.Device = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "Android"] = 0;
            values[valuesById[1] = "IOS"] = 1;
            values[valuesById[2] = "Windows"] = 2;
            values[valuesById[3] = "Linux"] = 3;
            values[valuesById[4] = "MacOS"] = 4;
            values[valuesById[5] = "Web"] = 5;
            return values;
        })();

        auth.Login = (function() {

            /**
             * Properties of a Login.
             * @memberof imparse.auth
             * @interface ILogin
             * @property {imparse.auth.Device|null} [device] Login device
             * @property {string|null} [username] Login username
             * @property {string|null} [deviceToken] Login deviceToken
             * @property {imparse.auth.Login.ConnType|null} [connType] Login connType
             * @property {string|null} [uuid] Login uuid
             * @property {string|null} [deviceName] Login deviceName
             */

            /**
             * Constructs a new Login.
             * @memberof imparse.auth
             * @classdesc Represents a Login.
             * @implements ILogin
             * @constructor
             * @param {imparse.auth.ILogin=} [properties] Properties to set
             */
            function Login(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Login device.
             * @member {imparse.auth.Device} device
             * @memberof imparse.auth.Login
             * @instance
             */
            Login.prototype.device = 0;

            /**
             * Login username.
             * @member {string} username
             * @memberof imparse.auth.Login
             * @instance
             */
            Login.prototype.username = "";

            /**
             * Login deviceToken.
             * @member {string} deviceToken
             * @memberof imparse.auth.Login
             * @instance
             */
            Login.prototype.deviceToken = "";

            /**
             * Login connType.
             * @member {imparse.auth.Login.ConnType} connType
             * @memberof imparse.auth.Login
             * @instance
             */
            Login.prototype.connType = 0;

            /**
             * Login uuid.
             * @member {string} uuid
             * @memberof imparse.auth.Login
             * @instance
             */
            Login.prototype.uuid = "";

            /**
             * Login deviceName.
             * @member {string} deviceName
             * @memberof imparse.auth.Login
             * @instance
             */
            Login.prototype.deviceName = "";

            /**
             * Creates a new Login instance using the specified properties.
             * @function create
             * @memberof imparse.auth.Login
             * @static
             * @param {imparse.auth.ILogin=} [properties] Properties to set
             * @returns {imparse.auth.Login} Login instance
             */
            Login.create = function create(properties) {
                return new Login(properties);
            };

            /**
             * Encodes the specified Login message. Does not implicitly {@link imparse.auth.Login.verify|verify} messages.
             * @function encode
             * @memberof imparse.auth.Login
             * @static
             * @param {imparse.auth.ILogin} message Login message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Login.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.device != null && Object.hasOwnProperty.call(message, "device"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.device);
                if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.deviceToken);
                if (message.connType != null && Object.hasOwnProperty.call(message, "connType"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.connType);
                if (message.uuid != null && Object.hasOwnProperty.call(message, "uuid"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.uuid);
                if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.deviceName);
                return writer;
            };

            /**
             * Encodes the specified Login message, length delimited. Does not implicitly {@link imparse.auth.Login.verify|verify} messages.
             * @function encodeDelimited
             * @memberof imparse.auth.Login
             * @static
             * @param {imparse.auth.ILogin} message Login message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Login.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Login message from the specified reader or buffer.
             * @function decode
             * @memberof imparse.auth.Login
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {imparse.auth.Login} Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Login.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.imparse.auth.Login();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.device = reader.int32();
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    case 3:
                        message.deviceToken = reader.string();
                        break;
                    case 4:
                        message.connType = reader.int32();
                        break;
                    case 5:
                        message.uuid = reader.string();
                        break;
                    case 6:
                        message.deviceName = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Login message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof imparse.auth.Login
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {imparse.auth.Login} Login
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Login.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Login message.
             * @function verify
             * @memberof imparse.auth.Login
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Login.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.device != null && message.hasOwnProperty("device"))
                    switch (message.device) {
                    default:
                        return "device: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.deviceToken != null && message.hasOwnProperty("deviceToken"))
                    if (!$util.isString(message.deviceToken))
                        return "deviceToken: string expected";
                if (message.connType != null && message.hasOwnProperty("connType"))
                    switch (message.connType) {
                    default:
                        return "connType: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    if (!$util.isString(message.uuid))
                        return "uuid: string expected";
                if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                    if (!$util.isString(message.deviceName))
                        return "deviceName: string expected";
                return null;
            };

            /**
             * Creates a Login message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof imparse.auth.Login
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {imparse.auth.Login} Login
             */
            Login.fromObject = function fromObject(object) {
                if (object instanceof $root.imparse.auth.Login)
                    return object;
                let message = new $root.imparse.auth.Login();
                switch (object.device) {
                case "Android":
                case 0:
                    message.device = 0;
                    break;
                case "IOS":
                case 1:
                    message.device = 1;
                    break;
                case "Windows":
                case 2:
                    message.device = 2;
                    break;
                case "Linux":
                case 3:
                    message.device = 3;
                    break;
                case "MacOS":
                case 4:
                    message.device = 4;
                    break;
                case "Web":
                case 5:
                    message.device = 5;
                    break;
                }
                if (object.username != null)
                    message.username = String(object.username);
                if (object.deviceToken != null)
                    message.deviceToken = String(object.deviceToken);
                switch (object.connType) {
                case "Connect":
                case 0:
                    message.connType = 0;
                    break;
                case "Reconnect":
                case 1:
                    message.connType = 1;
                    break;
                }
                if (object.uuid != null)
                    message.uuid = String(object.uuid);
                if (object.deviceName != null)
                    message.deviceName = String(object.deviceName);
                return message;
            };

            /**
             * Creates a plain object from a Login message. Also converts values to other types if specified.
             * @function toObject
             * @memberof imparse.auth.Login
             * @static
             * @param {imparse.auth.Login} message Login
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Login.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.device = options.enums === String ? "Android" : 0;
                    object.username = "";
                    object.deviceToken = "";
                    object.connType = options.enums === String ? "Connect" : 0;
                    object.uuid = "";
                    object.deviceName = "";
                }
                if (message.device != null && message.hasOwnProperty("device"))
                    object.device = options.enums === String ? $root.imparse.auth.Device[message.device] : message.device;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.deviceToken != null && message.hasOwnProperty("deviceToken"))
                    object.deviceToken = message.deviceToken;
                if (message.connType != null && message.hasOwnProperty("connType"))
                    object.connType = options.enums === String ? $root.imparse.auth.Login.ConnType[message.connType] : message.connType;
                if (message.uuid != null && message.hasOwnProperty("uuid"))
                    object.uuid = message.uuid;
                if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                    object.deviceName = message.deviceName;
                return object;
            };

            /**
             * Converts this Login to JSON.
             * @function toJSON
             * @memberof imparse.auth.Login
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Login.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * ConnType enum.
             * @name imparse.auth.Login.ConnType
             * @enum {number}
             * @property {number} Connect=0 Connect value
             * @property {number} Reconnect=1 Reconnect value
             */
            Login.ConnType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Connect"] = 0;
                values[valuesById[1] = "Reconnect"] = 1;
                return values;
            })();

            return Login;
        })();

        return auth;
    })();

    return imparse;
})();

export { $root as default };
