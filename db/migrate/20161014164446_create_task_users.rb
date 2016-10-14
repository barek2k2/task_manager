class CreateTaskUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :task_users do |t|
      t.integer :task_id
      t.integer :user_id

      t.timestamps
    end
    add_index(:task_users, [:task_id, :user_id])
  end
end
