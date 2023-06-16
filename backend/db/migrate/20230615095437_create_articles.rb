class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :body, null: false
      t.string :tag_list
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end
