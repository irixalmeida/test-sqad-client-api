import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // TTL de 1 hora

export default cache;
