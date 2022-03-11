"""Updated tables

Revision ID: 911f827d1919
Revises: b9d640a6de7d
Create Date: 2022-03-10 19:02:07.965915

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '911f827d1919'
down_revision = 'b9d640a6de7d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bank_accounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('bank_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=30), nullable=False),
    sa.Column('account_number', sa.String(length=17), nullable=False),
    sa.ForeignKeyConstraint(['bank_id'], ['banks.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('account_number')
    )
    op.drop_table('linked_accounts')
    op.drop_column('assets', 'name')
    op.alter_column('users', 'buying_power',
               existing_type=sa.NUMERIC(precision=10, scale=2),
               type_=sa.Numeric(precision=23, scale=2),
               existing_nullable=True)
    op.drop_column('watchlist_stocks', 'name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('watchlist_stocks', sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
    op.alter_column('users', 'buying_power',
               existing_type=sa.Numeric(precision=23, scale=2),
               type_=sa.NUMERIC(precision=10, scale=2),
               existing_nullable=True)
    op.add_column('assets', sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
    op.create_table('linked_accounts',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('bank_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('account_number', sa.VARCHAR(length=16), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['bank_id'], ['banks.id'], name='linked_accounts_bank_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='linked_accounts_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='linked_accounts_pkey'),
    sa.UniqueConstraint('account_number', name='linked_accounts_account_number_key')
    )
    op.drop_table('bank_accounts')
    # ### end Alembic commands ###
