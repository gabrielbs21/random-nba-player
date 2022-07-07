/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Player } from "../utils/types.ts";
import { Head } from "$fresh/runtime.ts";

export const handler: Handlers<Player[] | null> = {
  async GET(_, ctx) {
    const url = "https://free-nba.p.rapidapi.com/players?page=0&per_page=25";

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": Deno.env.get("RAPIDAPI_KEY") || "",
        "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
      },
    };

    const responseRaw = await fetch(url, options);
    const response = await responseRaw.json();

    return ctx.render(response.data as Player[]);
  },
};

export default function Home({ data }: PageProps<Player[]>) {
  const player = data[Math.floor(Math.random() * data.length)];

  return (
    <div>
      <Head>
        <title>Random NBA player</title>
      </Head>
      <div class={tw`p-4 max-w-screen-md h-screen mx-auto`}>
        <div class={tw`h-full flex flex-col justify-center items-center`}>
          <h1 class={tw`text-5xl text-[#3b454e] font-extrabold mb-6`}>
            Your random NBA player is:
          </h1>

          <div
            class={tw`relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16`}
          >
            <div class={tw`px-6`}>
              <div class={tw`text-center mt-2`}>
                <h3 class={tw`text-2xl font-bold leading-normal mb-1`}>
                  {`${player.first_name} ${player.last_name}`}
                </h3>
                <div
                  class={tw`text-xs mt-0 mb-2 text-slate-400 font-bold uppercase`}
                >
                  <i class={tw`fas fa-map-marker-alt mr-2 text-[#8d8d8d]`}></i>
                  {player.position || "?"}, {player.team.full_name}
                </div>
              </div>
              <div class={tw`flex flex-wrap justify-center`}>
                <div class={tw`w-full text-center`}>
                  <div class={tw`flex justify-center lg:pt-4 pt-8 pb-0`}>
                    <div class={tw`p-3 text-center`}>
                      <span
                        class={tw`text-xl font-bold block uppercase tracking-wide text-slate-700`}
                      >
                        {player.height_feet || "?"}
                      </span>
                      <span class={tw`text-sm text-slate-400`}>Feet</span>
                    </div>
                    <div class={tw`p-3 text-center`}>
                      <span
                        class={tw`text-xl font-bold block uppercase tracking-wide text-slate-700`}
                      >
                        {player.height_inches || "?"}
                      </span>
                      <span class={tw`text-sm text-slate-400`}>Inches</span>
                    </div>

                    <div class={tw`p-3 text-center`}>
                      <span
                        class={tw`text-xl font-bold block uppercase tracking-wide text-slate-700`}
                      >
                        {player.weight_pounds || "?"}
                      </span>
                      <span class={tw`text-sm text-slate-400`}>Pounds</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class={tw`mt-6 py-6 border-t border-slate-200 text-center`}>
                <div class={tw`flex flex-wrap justify-center`}>
                  <div class={tw`w-full px-4`}>
                    <p
                      class={tw`font-light leading-relaxed text-slate-600 mb-4`}
                    >
                      {player.team.full_name} division:{" "}
                      <span class={tw`font-medium`}>
                        {player.team.division}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
