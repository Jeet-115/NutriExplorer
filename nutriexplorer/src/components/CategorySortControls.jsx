const CategorySortControls = ({ categories, category, setCategory, setQuery, setPage, sortOption, setSortOption }) => (
    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium mb-1">Filter by Category:</label>
        <select
          className="p-2 border rounded w-full max-w-xs text-black"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
            setQuery("");
          }}
        >
          <option value="">-- All Categories --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Sort by:</label>
        <select
          className="p-2 border rounded w-full max-w-xs text-black"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">-- None --</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="grade-asc">Nutrition Grade (A–E)</option>
          <option value="grade-desc">Nutrition Grade (E–A)</option>
        </select>
      </div>
    </div>
  );
  
  export default CategorySortControls;