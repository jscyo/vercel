import { domain } from "./constants";
export function isStringAValidUrl(url: string): boolean {
  // a URL contains a resource a protocol
  // should contain http:// or https

  // url cannot be an empty string
  if (url.length === 0) {
    return false;
  }

  // check that url starts with http:// or https://
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  }

  return false;

  // TODO: add checks for valid top level domains?
  // TODO: should contain at least one . signifying a domain and sub domain
}

export function generateActualUrlFromMappedId(mappedId: string): string {
    // this should be in the format of "https://veceldomain.com/api/mappedId"
  return "https://"+domain + "/api/" + mappedId;
}
