import crypto from 'crypto';
const getUniqueId = (): string => {
    return crypto.randomUUID()
}

export default getUniqueId;