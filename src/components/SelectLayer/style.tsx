export const sx = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1
  },
  itemContainer: {
    justifyContent: 'center'
  },
  itemElement: {
    width: '50%',
    textAlign: 'center'
  },
  button: {
    height: 100,
    borderRadius: '10px',
    bgcolor: '#ccc',
    '&:hover': {
      border: '1px solid #1976d2'
    }
  },
  textContent: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}
