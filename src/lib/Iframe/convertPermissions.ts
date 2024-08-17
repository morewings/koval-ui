import type {PermissionsConfig, Permission} from './types.ts';

const normalizeValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
        return "'src'";
    } else if (value === 'self') {
        return "'self'";
    } else if (value === 'src') {
        return "'src'";
    } else if (value === 'none') {
        return "'none'";
    }
    return value;
};

export const convertPermissions = (permissions: PermissionsConfig) => {
    return Object.entries(permissions)
        .map(([key, value]) => (Array.isArray(value) ? [key, value] : [key, [value]]))
        .map(([key, value]) => {
            return [key, (value as Permission[]).map(normalizeValue).join(' ')];
        })
        .map(permissionsArray => permissionsArray.join(' '))
        .join('; ');
};
