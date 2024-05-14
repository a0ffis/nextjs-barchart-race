import mysql from "@/lib/mariadb";

export async function GET(request: Request) {
  try {
    const result = await mysql.query(
      "SELECT country_name, year, population FROM population",
      // "CALL get_population()",
      [],
    );

    const obj = {};
    result[0].map((item: any) => {
      if (Object.hasOwn(obj, item.country_name)) {
        obj[item.country_name] = {
          ...obj[item.country_name],
          [item.year]: item.population,
        };
      } else {
        obj[item.country_name] = { [item.year]: item.population };
      }
    });

    console.log(result);
    return Response.json({ status: "ok", results: obj });
  } catch (err) {
    console.log("error here : ", err);
    return Response.json({ status: "error", message: err });
  }
}
