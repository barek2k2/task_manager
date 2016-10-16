class CreateLabelings < ActiveRecord::Migration[5.0]
  def change
    create_table :labelings do |t|
      t.integer :task_id, index: true
      t.integer :label_id, index: true

      t.timestamps
    end
  end
end
