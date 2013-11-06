class CreateOvens < ActiveRecord::Migration
  def change
    create_table :ovens do |t|
      t.string  :name

      t.timestamps
    end
  end
end
