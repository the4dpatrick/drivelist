module.exports = () ->
  availableExtensions = JSON.parse(window.__adobe_cep__.getExtensions())
  filterExtensions = (e) -> e.id == window.__adobe_cep__.getExtensionId()
  currentExtension = availableExtensions.filter(filterExtensions)[0]
  extensionPath = currentExtension.basePath

  return extensionPath;
