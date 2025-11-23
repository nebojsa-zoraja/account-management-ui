import {
  Button,
  Dialog,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { accessRoleApi, RoleDeletionImpactDTO } from "../../api/accessRoleApi";
import styles from "./RoleDeletionImpactDialog.module.scss";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";

interface RoleDeletionImpactDialogProps {
  roleId: number | null;
  roleName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RoleDeletionImpactDialog = ({
  roleId,
  roleName,
  isOpen,
  onClose,
  onConfirm,
}: RoleDeletionImpactDialogProps) => {
  const [impactData, setImpactData] = useState<RoleDeletionImpactDTO | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImpact = async () => {
      if (!isOpen || !roleId) return;

      setIsLoading(true);
      setError(null);
      try {
        const impact = await accessRoleApi.getRoleDeletionImpact(roleId);
        setImpactData(impact);
      } catch (err) {
        console.error("Error fetching role deletion impact:", err);
        setError("Greška pri učitavanju uticaja brisanja uloge");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImpact();
  }, [isOpen, roleId]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const hasImpact =
    impactData &&
    (impactData.totalAffectedProjects > 0 ||
      impactData.totalAffectedUserGroups > 0);

  return (
    <Dialog
      className={styles["dialog-container"]}
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={onClose}
    >
      <div className={styles["wrapper"]}>
        <div className={styles["edit-card"]}>
          {/* Header */}
          <div className={styles["card-title"]}>
            <WarningAmberIcon className={styles["warning-icon"]} />
            <span className={styles["title-text"]}>
              Brisanje uloge
            </span>
          </div>

          {/* Content */}
          <div className={styles["content-section"]}>
            {isLoading ? (
              <Box className={styles["loading-container"]}>
                <CircularProgress className={styles["loading-progress"]} size={50} />
                <Typography variant="body1" className={styles["loading-text"]}>
                  Analiziranje uticaja...
                </Typography>
              </Box>
            ) : error ? (
              <Box className={styles["error-container"]}>
                <ErrorOutlineIcon className={styles["error-icon"]} />
                <Typography variant="h6" className={styles["error-text"]}>
                  {error}
                </Typography>
              </Box>
            ) : impactData ? (
              <>
                {/* Role Info */}
                <Box className={styles["role-info"]}>
                  <Typography variant="body2" className={styles["label"]}>
                    Uloga
                  </Typography>
                  <Typography variant="h6" className={styles["role-name"]}>
                    {roleName}
                  </Typography>
                </Box>

                {/* Impact Summary */}
                <Box className={styles["impact-summary"]}>
                  {!hasImpact ? (
                    <Box className={styles["safe-delete"]}>
                      <CheckCircleOutlineIcon className={styles["success-icon"]} />
                      <Typography variant="body2" className={styles["success-text"]}>
                        Ova uloga se ne koristi ni u jednom projektu ili grupi
                        korisnika.
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography
                        variant="body2"
                        className={styles["impact-header-text"]}
                      >
                        Brisanje će uticati na sledeće resurse:
                      </Typography>

                      {/* Affected Projects */}
                      {impactData.totalAffectedProjects > 0 && (
                        <Box className={styles["impact-section"]}>
                          <Box className={styles["section-header"]}>
                            <FolderIcon className={styles["project-icon"]} />
                            <Typography variant="subtitle2" fontWeight="600">
                              Projekti ({impactData.totalAffectedProjects})
                            </Typography>
                          </Box>
                          <Box className={styles["items-list"]}>
                            {impactData.affectedProjects.map((project) => (
                              <Box
                                key={project.projectId}
                                className={styles["list-item"]}
                              >
                                <Typography variant="body2">
                                  {project.projectName}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Affected User Groups */}
                      {impactData.totalAffectedUserGroups > 0 && (
                        <Box className={styles["impact-section"]}>
                          <Box className={styles["section-header"]}>
                            <GroupIcon className={styles["group-icon"]} />
                            <Typography variant="subtitle2" fontWeight="600">
                              Grupe korisnika ({impactData.totalAffectedUserGroups})
                            </Typography>
                          </Box>
                          <Box className={styles["items-list"]}>
                            {impactData.affectedUserGroups.map((group) => (
                              <Box
                                key={group.userGroupId}
                                className={styles["list-item"]}
                              >
                                <Box>
                                  <Typography variant="body2">
                                    {group.userGroupName}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    className={styles["group-caption-text"]}
                                  >
                                    Projekat: {group.projectName}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* Warning Message */}
                      <Box className={styles["warning-message"]}>
                        <ErrorOutlineIcon className={styles["warning-error-icon"]} />
                        <Typography variant="body2" className={styles["warning-text"]}>
                          Sve dodele ove uloge će biti trajno obrisane. Ova akcija se ne može poništiti.
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </>
            ) : null}
          </div>

          {/* Footer */}
          <div className={styles["button-section"]}>
            <Button
              size="large"
              className={styles["cancel-button"]}
              onClick={onClose}
            >
              Otkaži
            </Button>
            <Button
              size="large"
              className={styles["confirm-button"]}
              onClick={handleConfirm}
              disabled={isLoading || !!error}
            >
              Obriši
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RoleDeletionImpactDialog;
