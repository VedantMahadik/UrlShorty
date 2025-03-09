import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";
const BASE_URL = process.env.BASE_URL ?? "http://urlshorty.";
const SUFFIX_URL = process.env.SUFFIX_URL ?? "";

const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

console.log(makeid(5));

export const createShortUrl = async (url: string) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    let short_url = makeid(10);
    while (true) {
      let { data, error } = await supabase
        .from("shorty")
        .select("url")
        .eq("short_url", short_url);
      if (error) {
        return {
          status: 400,
          data: error,
        };
      }
      if (!data || data.length == 0) {
        break;
      }
      short_url = makeid(10);
    }

    let { data, error } = await supabase
      .from("shorty")
      .insert({
        url: url,
        short_url: short_url,
      })
      .select();
    if (error) {
      return {
        status: 400,
        data: error,
      };
    }
    if (data?.length == 0) {
      return {
        status: 400,
        data: "Failed to insert",
      };
    }
    if (data && data?.length > 0) {
      const new_url = BASE_URL + data[0].short_url + SUFFIX_URL;
      //@ts-ignore
      return { status: 200, data: new_url };
    } else {
      return { status: 400, data: "Unable to create url" };
    }
  } catch (e) {
    // TODO: error handling
    return { status: 400, data: e };
  }
};

export const getUrl = async (short_url: string) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    let { data, error } = await supabase
      .from("shorty")
      .select("url")
      .eq("short_url", short_url);
    if (error) {
      return {
        status: 400,
        data: error,
      };
    }
    if (data?.length == 0) {
      return {
        status: 400,
        data: "No rows found.",
      };
    }
    //@ts-ignore
    return { status: 200, data: data[0].url };
  } catch (e) {
    // TODO: error handling
    return { status: 400, data: e };
  }
};
