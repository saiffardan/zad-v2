import { readFileSync } from "fs"
import { join } from "path"
import { ZadScripts } from "./zad-scripts"

export default function ZadApp() {
  const bodyHtml = readFileSync(join(process.cwd(), "public", "zad-body.html"), "utf-8")

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <ZadScripts />
    </>
  )
}
