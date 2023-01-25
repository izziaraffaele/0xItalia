import { useState } from 'react';
// @mui
import {
  Button,
  ButtonProps,
  Tooltip,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LaunchIcon from '@mui/icons-material/Launch';
import useLocales from '../../../hooks/useLocales';
import { REPOSITORY } from '../../../config';

import { FabButtonAnimate } from '../../../components/animate';

function DesktopDialogTrigger({ title, ...others }: ButtonProps) {
  return (
    <Button
      {...others}
      variant="soft"
      // color="secondary"
      startIcon={<AddIcon />}
      sx={(theme) => ({
        display: 'none',
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      })}
    >
      {title}
    </Button>
  );
}

function MobileDialogTrigger({ title, ...others }: ButtonProps) {
  return (
    <Tooltip
      title={title}
      placement="bottom-start"
      sx={(theme) => ({
        display: 'block',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      })}
    >
      <Box>
        <Fab variant="soft" size="small">
          <AddIcon />
        </Fab>
      </Box>
    </Tooltip>
  );
}

export default function AddProjectPopup() {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const trigger = translate('action.addProject');

  return (
    <>
      <DesktopDialogTrigger title={trigger} onClick={handleOpen} />
      <MobileDialogTrigger title={trigger} onClick={handleOpen} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{translate('addProject.title')}</DialogTitle>
        <DialogContent>{translate('addProject.description')}</DialogContent>
        <DialogActions>
          <Button
            endIcon={<LaunchIcon />}
            component="a"
            href={REPOSITORY}
            target="_blank"
          >
            {translate('addProject.action')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
