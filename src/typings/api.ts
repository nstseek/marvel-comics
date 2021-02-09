/**
 * This is the boilerplate for every response that comes from the API
 * The data property will have the requested content, other properties are just stats from the request that you just did
 * @param T - The content type in data property returned from the API
 */
interface ApiResponse<T = any> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
  etag: string;
}

/**
 * This is the default content that will be returned when you fetch comics from the API
 */
export interface Comic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description?: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: {
    type: string;
    language: string;
    text: string;
  }[];
  resourceURI: string;
  urls: {
    type: string;
    url: string;
  }[];
  series: {
    resourceURI: string;
    name: string;
  };
  variants: {
    resourceURI: string;
    name: string;
  }[];
  collections: {
    resourceURI: string;
    name: string;
  }[];
  collectedIssues: {
    resourceURI: string;
    name: string;
  }[];
  dates: {
    type: string;
    date: string;
  }[];
  prices: {
    type: string;
    price: number;
  }[];
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
  creators: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
  };
  characters: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
  };
  stories: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
      type: string;
    }[];
  };
  events: {
    available: number;
    returned: number;
    collectionURI: string;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
}

/**
 * This is the complete response from the API when you are requesting comics
 */
export type ComicResponse = ApiResponse<Comic>;

/**
 * This is the params that you can send in the comic request
 *
 * There are many more available params, we only have the ones that we're using here
 */
export interface ComicParams {
  apikey: string;
  titleStartsWith?: string;
  format?:
    | 'comic'
    | 'magazine'
    | 'trade paperback'
    | 'hardcover'
    | 'digest'
    | 'graphic novel'
    | 'digital comic'
    | 'infinite comic';
  formatType?: 'comic' | 'collection';
  limit?: number;
  offset?: number;
}
