import { supabase } from "./supabaseClient"

export async function getURLMappingIfExists(
  actualLink: string
): Promise<string | undefined> {
  // check that a mapping exists
  let { data, error, status } = await supabase
    .from("url-link-mapping")
    .select("shortend_link")
    .eq("actual_link", actualLink)
    .single();

  if (status === 200) {
    return data.shortend_link;
  }

  return undefined;
}

export async function createNewURLMapping(actualLink: string): Promise<string> {

  let stringToAppend = randomString(6);

  // retrieve all urls
  let { data, error, status } = await supabase
    .from("url-link-mapping")
    .select("shortend_link");

  if (data?.length == 0) {
    await createMapping(stringToAppend, actualLink)
    return stringToAppend;
  } 
  // TODO: add logic to check if a duplicate url is made
  await createMapping(stringToAppend, actualLink)
  return stringToAppend;

}

async function createMapping(shortend_link: string, actual_link: string) {
  await supabase
    .from("url-link-mapping")
    .insert([{ shortend_link, actual_link }]);
}

function randomString(strLength: number): string {
  var result = [];

  strLength = strLength || 5;
  let charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (strLength--) {
    // (note, fixed typo)
    result.push(charSet.charAt(Math.floor(Math.random() * charSet.length)));
  }

  return result.join("");
}
