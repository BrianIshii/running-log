export function buildMetaData(data) {
  let output = "---\n"

  let metadata = []
  Object.keys(data).forEach((key) => {
    metadata.push(key + ': ' + data[key] + '\n')
  });
  output = output.concat(metadata.join(""))
  output = output.concat("---\n")

  return output
}