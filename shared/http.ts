import "isomorphic-fetch";

export const get = (url: string, opts = {}) => {
  const isRelative = url.startsWith("/");
  const endpoint = isRelative ? `${process.env.API_URL}${url}` : url;
  return fetch(endpoint, opts).then(r => r.json());
};

export const endpoints = {
  searchAnime: (id: string) => `/mal/search/${id}`,
  searchCharacters: (id: string) => `/mal/characters/${id}`,
  view: (id: string) => `/view/${id}`,
  save: `/save`,
  lookupSave: (id: string) => `/lookup/${id}`
};
