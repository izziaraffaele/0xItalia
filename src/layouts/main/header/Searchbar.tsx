import React, { useEffect, useRef } from 'react';
// @mui
import { Paper, InputBase, SxProps, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
// next
import { useRouter } from 'next/router';
// paths
import { PATH_PROJECTS } from '../../../paths';
import { HEADER_DESKTOP, HEADER_MOBILE } from '../config';
// components
import { IconButtonAnimate } from '../../../components/animate';

const RootStyle = styled('form')(({ theme }) => ({
  // flex: 1,
}));

const InputContainerStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
  transition: theme.transitions.create('all'),
  height: 40,
  opacity: 0,
  position: 'absolute',
  left: 0,
  right: 0,
  top: HEADER_MOBILE * -1,
  width: '100%',
  zIndex: 1,
  '& .searchbar_search-icon': {
    color: theme.palette.text.secondary,
    transition: theme.transitions.create('color'),
  },
  '& #searchbar_close-btn': {
    opacity: 0,
    transition: theme.transitions.create('opacity'),
  },
  '&:focus-within #searchbar_close-btn': {
    opacity: 1,
  },
  '&:focus-within .searchbar_search-icon': {
    color: theme.palette.text.primary,
  },
  '&:focus-within': {
    height: HEADER_MOBILE,
    width: '100%',
    top: 0,
    opacity: 1,
  },
  [theme.breakpoints.up('sm')]: {
    width: 280,
    position: 'initial',
    opacity: 1,
    '&:focus-within': {
      height: 40,
      width: 400,
    },
  },
  [theme.breakpoints.up('md')]: {
    margin: '0 auto',
    '&:focus-within': {
      width: 600,
    },
  },
}));

const MobileButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export type SearchBarProps = { sx?: SxProps; onSearch?: () => any };

export default function Searchbar(props: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>();
  const rootRef = useRef<any>();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const input = String(inputRef.current?.value || '');

    if (router.query.search !== input) {
      router.push({ pathname: PATH_PROJECTS.root, query: { search: input } });
    }
  };

  const handleReset = (e: any) => {
    router.push({ pathname: PATH_PROJECTS.root, query: { search: '' } });

    setTimeout(() => {
      rootRef.current.focus();
    }, 0);
  };

  // preload the input value with url s
  useEffect(() => {
    const query =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search);

    if (inputRef.current && query && query.has('search')) {
      inputRef.current.value = String(query.get('search'));
    }
  }, []);

  return (
    <RootStyle sx={props.sx} onSubmit={handleSearch} onReset={handleReset}>
      <MobileButton onClick={() => inputRef.current?.focus()} ref={rootRef}>
        <SearchIcon className="searchbar_search-icon" />
      </MobileButton>
      <InputContainerStyle>
        <SearchIcon className="searchbar_search-icon" />
        <InputBase
          inputRef={inputRef}
          defaultValue={router.query.search}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Cerca..."
          inputProps={{ 'aria-label': 'search wallet' }}
        />
        <IconButtonAnimate
          sx={{ color: 'text.secondary' }}
          type="reset"
          id="searchbar_close-btn"
          size="small"
        >
          <CloseIcon color="inherit" />
        </IconButtonAnimate>
      </InputContainerStyle>
    </RootStyle>
  );
}
