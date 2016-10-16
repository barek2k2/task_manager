class AddStatusToTask < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :status, :integer, :default => 0
    add_index(:tasks, :status) unless index_exists?(:tasks, :status)
  end
end
