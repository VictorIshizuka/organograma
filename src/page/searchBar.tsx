interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  searchScope: string;
  setSearchScope: (val: string) => void;
}

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  searchScope,
  setSearchScope,
}: Props) => (
  <div className="d-flex justify-content-center align-items-center gap-2 mb-4 flex-wrap">
    <input
      type="text"
      className="form-control"
      placeholder="Buscar..."
      style={{ maxWidth: "300px" }}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
    <select
      className="form-select"
      style={{ maxWidth: "180px" }}
      value={searchScope}
      onChange={e => setSearchScope(e.target.value)}
    >
      <option value="all">Todos</option>
      <option value="teams">Times</option>
      <option value="collaborators">Colaboradores</option>
    </select>
  </div>
);
