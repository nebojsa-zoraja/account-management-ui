import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { userAccountApi, BulkImportResult } from "../../../api/userAccountApi";
import styles from "./ImportUsersDialog.module.scss";

interface ImportUsersDialogProps {
  open: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export const ImportUsersDialog: React.FC<ImportUsersDialogProps> = ({
  open,
  onClose,
  onImportComplete,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<BulkImportResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImportResult(null);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError("Please select a CSV file");
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const result = await userAccountApi.importUsersFromCsv(selectedFile);
      setImportResult(result);

      if (result.successCount > 0) {
        onImportComplete();
      }
    } catch (err: any) {
      // Handle standardized error response from GlobalExceptionHandlerMiddleware
      const errorMessage = err.response?.data?.message ||
                          err.message ||
                          "An error occurred during import";
      setError(errorMessage);
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImportResult(null);
    setError(null);
    onClose();
  };

  const downloadTemplate = () => {
    const csvContent =
      "FirstName,LastName,Username,Email,Password,PhoneNumber,Gender\n" +
      "John,Doe,johndoe,john.doe@example.com,Password123!,+1234567890,Male\n" +
      "Jane,Smith,janesmith,jane.smith@example.com,SecurePass456!,+0987654321,Female";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_import_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Import Users from CSV</DialogTitle>
      <DialogContent>
        <Box className={styles["dialog-content"]}>
          <Alert severity="info" className={styles["info-alert"]}>
            Upload a CSV file with user data. The file should include columns:
            FirstName, LastName, Username, Email, Password, PhoneNumber, Gender
          </Alert>

          <Button
            variant="outlined"
            onClick={downloadTemplate}
            className={styles["template-button"]}
            size="small"
          >
            Download CSV Template
          </Button>

          <Box className={styles["file-upload-section"]}>
            <input
              accept=".csv"
              className={styles["hidden-input"]}
              id="csv-file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="csv-file-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                disabled={importing}
              >
                Select CSV File
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" className={styles["selected-file"]}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>

          {importing && (
            <Box className={styles["progress-section"]}>
              <Typography variant="body2" gutterBottom>
                Importing users...
              </Typography>
              <LinearProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" className={styles["error-alert"]}>
              {error}
            </Alert>
          )}

          {importResult && (
            <Box className={styles["results-section"]}>
              <Alert
                severity={importResult.failureCount === 0 ? "success" : "warning"}
                className={styles["results-alert"]}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Import completed: {importResult.successCount} successful,{" "}
                  {importResult.failureCount} failed out of{" "}
                  {importResult.totalProcessed} total
                </Typography>
              </Alert>

              <TableContainer component={Paper} className={styles["results-table-container"]}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Row</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Error</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {importResult.results.map((result) => (
                      <TableRow
                        key={result.rowNumber}
                        className={result.success ? styles["success-row"] : styles["error-row"]}
                      >
                        <TableCell>{result.rowNumber}</TableCell>
                        <TableCell>{result.email}</TableCell>
                        <TableCell>{result.username}</TableCell>
                        <TableCell>
                          {result.success ? (
                            <Chip
                              icon={<CheckCircleIcon />}
                              label="Success"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              icon={<ErrorIcon />}
                              label="Failed"
                              color="error"
                              size="small"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {result.errorMessage && (
                            <Typography variant="caption" color="error">
                              {result.errorMessage}
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={importing}>
          {importResult ? "Close" : "Cancel"}
        </Button>
        {!importResult && (
          <Button
            onClick={handleImport}
            variant="contained"
            disabled={!selectedFile || importing}
          >
            Import
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
