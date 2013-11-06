class CreateCookies < ActiveRecord::Migration
  def change
    create_table :cookies do |t|
      t.string  :timeCooked
      t.string  :bakeTime
      t.string  :cookie_type
      t.integer :oven_id, default: nil
      t.integer :table_id, default: nil

      t.timestamps
    end
  end
end
