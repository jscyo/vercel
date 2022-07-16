import type { NextApiRequest, NextApiResponse } from "next";
import { getURLMappingIfExistsWithMappdId } from "../../utils/supabaseQueries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { param } = req.query;

  // check if the mappedId exists in the db
  let url = Array.isArray(param)? param[0]: param;

  const urlMapping = await getURLMappingIfExistsWithMappdId(url);
  
  if(urlMapping !== undefined){
    res.redirect(urlMapping.actual_link)
  }

    res.send({ message: "Success" });
}
