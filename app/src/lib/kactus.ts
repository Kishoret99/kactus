import { exec } from 'child_process'
import { IKactusStatusResult, find } from 'kactus-cli'
import { Repository } from '../models/repository'

const SKETCHTOOL_PATH = '/Applications/Sketch.app/Contents/Resources/sketchtool/bin/sketchtool'

/**
 *  Retrieve the status for a given repository
 */
export async function getKactusStatus(repository: Repository): Promise<IKactusStatusResult> {
  return Promise.resolve().then(() => {
    const kactus = find(repository.path)
    return {
      config: kactus.config,
      files: kactus.files.map(f => {
        return {
          ...f,
          id: f.path.replace(repository.path, '').replace(/^\//, ''),
        }
      }),
    }
  })
}

export async function generateDocumentPreview(file: string, output: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(SKETCHTOOL_PATH + ' export preview "' + file + '" --output="' + output + '" --filename=document.png --overwriting=YES', (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      resolve(output + '/document.png')
    })
  })
}

export async function generatePagePreview(file: string, id: string, output: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(SKETCHTOOL_PATH + ' export pages "' + file + '" --item="' + id + '" --output="' + output + '" --save-for-web=YES --use-id-for-name=YES --overwriting=YES', (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      resolve(output + '/' + id + '.png')
    })
  })
}

export async function generateArtboardPreview(file: string, id: string, output: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(SKETCHTOOL_PATH + ' export artboards "' + file + '" --item="' + id + '" --output="' + output + '" --save-for-web=YES --use-id-for-name=YES --overwriting=YES --include-symbols=YES', (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      resolve(output + '/' + id + '.png')
    })
  })
}

export async function generateLayerPreview(file: string, id: string, output: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec(SKETCHTOOL_PATH + ' export layers "' + file + '" --item="' + id + '" --output="' + output + '" --save-for-web=YES --use-id-for-name=YES --overwriting=YES', (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      resolve(output + '/' + id + '.png')
    })
  })
}
