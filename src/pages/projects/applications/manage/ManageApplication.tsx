import {
  CircularProgress,
  TextField,
  Divider,
  Box,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { useEffect, ChangeEvent, useMemo } from "react";
import ChipInput from "../../../../components/chipInput/ChipInput";
import MultipleSelect from "../../../../components/multipleSelect/MultipleSelect";
import {
  ApplicationGrantType,
  ApplicationResponseType,
  ApplicationType,
  ApplicationClientAuthMethod,
} from "../../../../models/enums/applicationEnums";
import useApplicationStore from "../../../../store/applicationStore/ApplicationStore";
import useProjectStore from "../../../../store/projectStore/ProjectStore";
import applicationAccessTokenTypeOptions, {
  applicationTypeOptions,
  applicationClientAuthMethodOptions,
  applicationGrantTypeOptions,
  applicationResponseTypeOptions,
} from "../../../../utils/dropdownOptions/applicationDropdownOptions";
import {
  filterAuthMethodOptions,
  filterGrantTypeOptions,
  filterResponseTypeOptions,
  getAllowedAuthMethods,
  getAllowedGrantTypes,
  getAllowedResponseTypes,
  getRecommendedGrantTypes,
  getRecommendedResponseType,
  getApplicationTypeHelpText,
  getDeprecationWarning,
  validateResponseTypes,
  validateGrantAndResponseTypeCompatibility,
} from "../../../../utils/zitadelApplicationValidator";
import styles from "./ManageApplication.module.scss";

const ManageApplication = () => {
  const {
    isDetailsLoading,
    selectedApplicationDetails,
    setSelectedApplicationDetails,
    isEdit,
  } = useApplicationStore();

  const { selectedProjectId, selectedProject } = useProjectStore();

  // Filter options based on selected application type
  const filteredAuthMethodOptions = useMemo(() => {
    const appType = selectedApplicationDetails.appType as ApplicationType;
    return filterAuthMethodOptions(applicationClientAuthMethodOptions, appType);
  }, [selectedApplicationDetails.appType]);

  const filteredGrantTypeOptions = useMemo(() => {
    const appType = selectedApplicationDetails.appType as ApplicationType;
    return filterGrantTypeOptions(applicationGrantTypeOptions, appType);
  }, [selectedApplicationDetails.appType]);

  const filteredResponseTypeOptions = useMemo(() => {
    const appType = selectedApplicationDetails.appType as ApplicationType;
    return filterResponseTypeOptions(applicationResponseTypeOptions, appType);
  }, [selectedApplicationDetails.appType]);

  // Get help text and warnings
  const appTypeHelpText = useMemo(() => {
    const appType = selectedApplicationDetails.appType as ApplicationType;
    return getApplicationTypeHelpText(appType);
  }, [selectedApplicationDetails.appType]);

  const deprecationWarning = useMemo(() => {
    return getDeprecationWarning(selectedApplicationDetails.grantTypes);
  }, [selectedApplicationDetails.grantTypes]);

  const responseTypeWarning = useMemo(() => {
    return validateResponseTypes(selectedApplicationDetails.responseTypes);
  }, [selectedApplicationDetails.responseTypes]);

  const grantResponseCompatibilityWarning = useMemo(() => {
    return validateGrantAndResponseTypeCompatibility(
      selectedApplicationDetails.grantTypes,
      selectedApplicationDetails.responseTypes
    );
  }, [selectedApplicationDetails.grantTypes, selectedApplicationDetails.responseTypes]);

  useEffect(() => {
    if (selectedProjectId) {
      setSelectedApplicationDetails((prev) => ({
        ...prev,
        applicationProjectId: selectedProjectId,
      }));
    }
    // eslint-disable-next-line
  }, [selectedProjectId]);

  // Auto-update configuration when application type changes
  useEffect(() => {
    const appType = selectedApplicationDetails.appType as ApplicationType;
    const allowedAuthMethods = getAllowedAuthMethods(appType);
    const allowedGrantTypes = getAllowedGrantTypes(appType);
    const allowedResponseTypes = getAllowedResponseTypes(appType);

    // Check if current auth method is allowed, if not, set to first allowed
    const currentAuthMethod = selectedApplicationDetails.authMethodType as ApplicationClientAuthMethod;
    if (!allowedAuthMethods.includes(currentAuthMethod)) {
      setSelectedApplicationDetails((prev) => ({
        ...prev,
        authMethodType: allowedAuthMethods[0],
      }));
    }

    // Filter out invalid grant types
    const validGrantTypes = selectedApplicationDetails.grantTypes.filter((gt) =>
      allowedGrantTypes.includes(gt)
    );
    if (validGrantTypes.length !== selectedApplicationDetails.grantTypes.length) {
      // If some grant types were filtered out, set recommended grant types
      const recommended = getRecommendedGrantTypes(appType);
      setSelectedApplicationDetails((prev) => ({
        ...prev,
        grantTypes: recommended,
      }));
    }

    // Filter out invalid response types
    const validResponseTypes = selectedApplicationDetails.responseTypes.filter((rt) =>
      allowedResponseTypes.includes(rt)
    );
    if (validResponseTypes.length !== selectedApplicationDetails.responseTypes.length) {
      // If some response types were filtered out, set recommended response type
      const recommended = getRecommendedResponseType(appType);
      setSelectedApplicationDetails((prev) => ({
        ...prev,
        responseTypes: [recommended],
      }));
    }
    // eslint-disable-next-line
  }, [selectedApplicationDetails.appType]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSelectedApplicationDetails((app) => ({
      ...app,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setSelectedApplicationDetails((app) => ({
      ...app,
      [name]: value,
    }));
  };

  return (
    <Box className={styles["container"]}>
      {isDetailsLoading ? (
        <Box className={styles["loading-state"]}>
          <CircularProgress className={styles["loading-progress"]} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Osnovna podešavanja
          </Typography>
          <Stack spacing={2.5}>
            <TextField
              name="name"
              label="Naziv aplikacije"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleInputChange}
              value={selectedApplicationDetails?.name || ""}
              disabled={isEdit}
              helperText={
                isEdit
                  ? "Naziv aplikacije se ne može menjati nakon kreiranja"
                  : ""
              }
            />
            <TextField
              label="Projekat"
              variant="outlined"
              size="small"
              fullWidth
              disabled
              value={selectedProject?.name || ""}
            />
            <TextField
              name="clockSkew"
              label="Vremensko odstupanje (sekundi)"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              onChange={handleInputChange}
              value={selectedApplicationDetails.clockSkew}
              helperText="Dozvoljeno vremensko odstupanje za validaciju tokena"
            />
          </Stack>

          <Divider className={styles["divider"]} />

          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Konfiguracija aplikacije
          </Typography>
          <Stack spacing={2.5}>
            <FormControl fullWidth size="small" disabled={isEdit}>
              <InputLabel>Tip aplikacije</InputLabel>
              <Select
                value={selectedApplicationDetails.appType}
                label="Tip aplikacije"
                onChange={(e) => handleSelectChange("appType", e.target.value)}
              >
                {applicationTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {isEdit && (
                <Typography variant="caption" color="text.secondary" className={styles["caption-text"]}>
                  Tip aplikacije se ne može menjati nakon kreiranja
                </Typography>
              )}
            </FormControl>

            {appTypeHelpText && (
              <Alert severity="info" className={styles["alert-text"]}>
                {appTypeHelpText}
              </Alert>
            )}

            <FormControl fullWidth size="small">
              <InputLabel>Metod autentifikacije</InputLabel>
              <Select
                value={selectedApplicationDetails.authMethodType}
                label="Metod autentifikacije"
                onChange={(e) =>
                  handleSelectChange("authMethodType", e.target.value)
                }
              >
                {filteredAuthMethodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="devMode"
                  checked={selectedApplicationDetails.devMode}
                  onChange={handleInputChange}
                />
              }
              label="Razvojni režim"
            />
          </Stack>

          <Divider className={styles["divider"]} />

          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            Konfiguracija tokena
          </Typography>
          <Stack spacing={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Tip tokena za pristup</InputLabel>
              <Select
                value={selectedApplicationDetails.accessTokenType}
                label="Tip tokena za pristup"
                onChange={(e) =>
                  handleSelectChange("accessTokenType", e.target.value)
                }
              >
                {applicationAccessTokenTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  name="accessTokenRoleAssertion"
                  checked={selectedApplicationDetails.accessTokenRoleAssertion}
                  onChange={handleInputChange}
                />
              }
              label="Dodavanje uloga u token za pristup"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="idTokenRoleAssertion"
                  checked={selectedApplicationDetails.idTokenRoleAssertion}
                  onChange={handleInputChange}
                />
              }
              label="Dodavanje uloga u ID token"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="idTokenUserinfoAssertion"
                  checked={selectedApplicationDetails.idTokenUserinfoAssertion}
                  onChange={handleInputChange}
                />
              }
              label="Dodavanje korisničkih informacija u ID token"
            />
          </Stack>

          <Divider className={styles["divider"]} />

          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            OAuth/OIDC podešavanja
          </Typography>
          <Stack spacing={2.5}>
            {deprecationWarning && (
              <Alert severity="warning" className={styles["alert-text"]}>
                {deprecationWarning}
              </Alert>
            )}

            {responseTypeWarning && (
              <Alert severity="error" className={styles["alert-text"]}>
                {responseTypeWarning}
              </Alert>
            )}

            {grantResponseCompatibilityWarning && (
              <Alert severity="error" className={styles["alert-text"]}>
                {grantResponseCompatibilityWarning}
              </Alert>
            )}

            <Box>
              <Typography variant="body2" className={styles["field-label"]}>
                Tipovi odobrenja
              </Typography>
              <MultipleSelect<ApplicationGrantType>
                styles={styles}
                setFunction={setSelectedApplicationDetails}
                objectState={selectedApplicationDetails}
                options={filteredGrantTypeOptions}
                name="grantTypes"
              />
              <Typography variant="caption" color="text.secondary" className={styles["caption-text"]}>
                Preporuka: Authorization Code + Refresh Token (PKCE)
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" className={styles["field-label"]}>
                Response tipovi
              </Typography>
              <MultipleSelect<ApplicationResponseType>
                styles={styles}
                setFunction={setSelectedApplicationDetails}
                objectState={selectedApplicationDetails}
                options={filteredResponseTypeOptions}
                name="responseTypes"
              />
              <Typography variant="caption" color="text.secondary" className={styles["caption-text"]}>
                Preporuka: CODE (Authorization Code flow)
              </Typography>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="skipNativeAppSuccessPage"
                  checked={selectedApplicationDetails.skipNativeAppSuccessPage}
                  onChange={handleInputChange}
                />
              }
              label="Preskoči stranicu uspešne prijave"
            />
          </Stack>

          <Divider className={styles["divider"]} />

          <Typography variant="h6" gutterBottom className={styles["section-title"]}>
            URI konfiguracija
          </Typography>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="body2" className={styles["field-label"]}>
                URI-jevi za preusmeravanje
              </Typography>
              <ChipInput
                styles={styles}
                onItemsChange={(newItems: string[]) =>
                  setSelectedApplicationDetails((prev) => ({
                    ...prev,
                    redirectUris: newItems,
                  }))
                }
                selectedItems={selectedApplicationDetails.redirectUris}
              />
            </Box>

            <Box>
              <Typography variant="body2" className={styles["field-label"]}>
                URI-jevi nakon odjave
              </Typography>
              <ChipInput
                styles={styles}
                onItemsChange={(newItems: string[]) =>
                  setSelectedApplicationDetails((prev) => ({
                    ...prev,
                    postLogoutRedirectUris: newItems,
                  }))
                }
                selectedItems={selectedApplicationDetails.postLogoutRedirectUris}
              />
            </Box>

            <Box>
              <Typography variant="body2" className={styles["field-label"]}>
                Dodatni izvori
              </Typography>
              <ChipInput
                styles={styles}
                onItemsChange={(newItems: string[]) =>
                  setSelectedApplicationDetails((prev) => ({
                    ...prev,
                    additionalOrigins: newItems,
                  }))
                }
                selectedItems={selectedApplicationDetails.additionalOrigins}
              />
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default ManageApplication;
