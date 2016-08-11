module.exports = function() {
  var availableExtensions, currentExtension, extensionPath, filterExtensions;
  availableExtensions = JSON.parse(window.__adobe_cep__.getExtensions());
  filterExtensions = function(e) {
    return e.id === window.__adobe_cep__.getExtensionId();
  };
  currentExtension = availableExtensions.filter(filterExtensions)[0];
  extensionPath = currentExtension.basePath;
  return extensionPath;
};
