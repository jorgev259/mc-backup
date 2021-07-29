import path from 'path'
import fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'
import AdmZip from 'adm-zip'

const date = new Date()
const [input = 'input', output = 'output', name = 'test'] = process.argv.slice(2)
const id = uuidv4()

const inputFolder = path.resolve(input)
const tempFolder = path.resolve('./temp', id)

fs.ensureDirSync(tempFolder)

fs.copy(inputFolder, tempFolder).then(async () => {
  const deleteFolders = ['cache', 'crash-reports', 'logs', 'temp']
  await Promise.all(deleteFolders.map(f => fs.remove(path.join(tempFolder, f))))

  const zip = new AdmZip()
  zip.addLocalFolder(tempFolder)

  const filename = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}_${name}.zip`
  zip.writeZip(path.resolve(output, filename), err => {
    if (err) throw new Error(err)
    fs.removeSync(tempFolder)
  })
})
